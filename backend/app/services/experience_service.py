from typing import List, Optional
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.experience import Experience
from app.repositories.experience import ExperienceRepository
from app.schemas.experience import ExperienceCreate, ExperienceUpdate


class ExperienceService:
    def __init__(self, experience_repo: ExperienceRepository):
        self.experience_repo = experience_repo

    async def get_multi(
        self, db: AsyncSession, user_id: Optional[UUID] = None, skip: int = 0, limit: int = 100
    ) -> List[Experience]:
        return await self.experience_repo.get_multi_by_owner(
            db, owner_id=user_id, skip=skip, limit=limit
        )

    async def get(self, db: AsyncSession, id: UUID, user_id: UUID) -> Optional[Experience]:
        experience = await self.experience_repo.get(db, id)
        if not experience:
            return None
        if experience.user_id != user_id:
            return None
        return experience

    async def create(
        self, db: AsyncSession, obj_in: ExperienceCreate, user_id: UUID
    ) -> Experience:
        return await self.experience_repo.create_with_owner(
            db, obj_in=obj_in, owner_id=user_id
        )

    async def update(
        self, db: AsyncSession, db_obj: Experience, obj_in: ExperienceUpdate
    ) -> Experience:
        return await self.experience_repo.update(db, db_obj=db_obj, obj_in=obj_in)

    async def delete(self, db: AsyncSession, db_obj: Experience) -> Experience:
        return await self.experience_repo.delete(db, id=db_obj.id)
