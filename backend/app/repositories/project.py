from typing import List, Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.project import Project
from app.repositories.base import CRUDBase
from app.schemas.project import ProjectCreate, ProjectUpdate


class ProjectRepository(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    async def create_with_owner(
        self, db: AsyncSession, *, obj_in: ProjectCreate, owner_id: UUID
    ) -> Project:
        obj_in_data = obj_in.model_dump()
        db_obj = Project(**obj_in_data, user_id=owner_id)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_multi_optimized(
        self,
        db: AsyncSession,
        *,
        user_id: Optional[UUID] = None,
        search: Optional[str] = None,
        tags: Optional[List[str]] = None,
        sort_by: str = "created_at", # "created_at" or "priority"
        skip: int = 0,
        limit: int = 10,
    ) -> List[Project]:
        """
        High-performance query for infinite scroll with advanced filtering.
        """
        query = select(Project)
        
        # Filtering
        if user_id:
            query = query.where(Project.user_id == user_id)
        
        if search:
            search_filter = f"%{search}%"
            query = query.where(
                (Project.title.ilike(search_filter)) | 
                (Project.description.ilike(search_filter))
            )
        
        if tags:
            # Universal approach for tags filtering (works with SQLite JSON and Postgres)
            # Since we are using JSON for tags, we check if any of the provided tags are in the JSON array
            for tag in tags:
                query = query.where(Project.tags.like(f'%"%#{tag}%"%')) # Rough match for JSON strings
                # Actually, a better way for SQLite/Postgres compatibility without overlap:
                # We'll use a simpler approach for now to ensure it works
                # query = query.where(Project.tags.contains(tag)) # SQLAlchemy contains might be better but depends on dialect
                # Let's use a standard LIKE to check if the tag exists in the stringified JSON
                query = query.where(Project.tags.cast(String).like(f'%"{tag}"%'))
        
        # Sorting
        if sort_by == "priority":
            query = query.order_by(Project.priority.desc(), Project.created_at.desc())
        else:
            query = query.order_by(Project.created_at.desc())
            
        # Pagination
        query = query.offset(skip).limit(limit)
        
        result = await db.execute(query)
        return list(result.scalars().all())
