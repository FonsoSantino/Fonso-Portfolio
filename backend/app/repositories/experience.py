from typing import List
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.experience import Experience
from app.repositories.base import CRUDBase
from app.schemas.experience import ExperienceCreate, ExperienceUpdate


class ExperienceRepository(CRUDBase[Experience, ExperienceCreate, ExperienceUpdate]):
    async def create_with_owner(
        self, db: AsyncSession, *, obj_in: ExperienceCreate, owner_id: UUID
    ) -> Experience:
        obj_in_data = obj_in.model_dump()
        db_obj = Experience(**obj_in_data, user_id=owner_id)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_multi_by_owner(
        self, db: AsyncSession, *, owner_id: Optional[UUID] = None, skip: int = 0, limit: int = 100
    ) -> List[Experience]:
        result = await db.execute(
            select(Experience)
            .where(Experience.user_id == owner_id if owner_id else True)
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())
