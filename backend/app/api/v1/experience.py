from typing import List
from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.experience import ExperienceCreate, ExperienceOut, ExperienceUpdate
from app.services.experience_service import ExperienceService
from app.api.deps import SessionDep, CurrentUser, get_experience_service

router = APIRouter()

@router.get("/", response_model=List[ExperienceOut])
async def read_experiences(
    session: SessionDep,
    experience_service: ExperienceService = Depends(get_experience_service),
    skip: int = 0,
    limit: int = 100,
) -> List[ExperienceOut]:
    """
    Retrieve experiences.
    """
    return await experience_service.get_multi(
        session, user_id=None, skip=skip, limit=limit
    )


@router.post("/", response_model=ExperienceOut)
async def create_experience(
    session: SessionDep,
    experience_in: ExperienceCreate,
    current_user: CurrentUser,
    experience_service: ExperienceService = Depends(get_experience_service),
) -> ExperienceOut:
    """
    Create new experience.
    """
    return await experience_service.create(
        session, obj_in=experience_in, user_id=current_user.id
    )


@router.put("/{experience_id}", response_model=ExperienceOut)
async def update_experience(
    session: SessionDep,
    experience_id: UUID,
    experience_in: ExperienceUpdate,
    current_user: CurrentUser,
    experience_service: ExperienceService = Depends(get_experience_service),
) -> ExperienceOut:
    """
    Update an experience.
    """
    experience = await experience_service.get(
        session, id=experience_id, user_id=current_user.id
    )
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return await experience_service.update(
        session, db_obj=experience, obj_in=experience_in
    )


@router.delete("/{experience_id}", response_model=ExperienceOut)
async def delete_experience(
    session: SessionDep,
    experience_id: UUID,
    current_user: CurrentUser,
    experience_service: ExperienceService = Depends(get_experience_service),
) -> ExperienceOut:
    """
    Delete an experience.
    """
    experience = await experience_service.get(
        session, id=experience_id, user_id=current_user.id
    )
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return await experience_service.delete(session, db_obj=experience)
