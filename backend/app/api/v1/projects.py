from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.project import ProjectCreate, ProjectOut, ProjectUpdate
from app.services.project_service import ProjectService
from app.api.deps import SessionDep, CurrentUser, get_project_service

router = APIRouter()

@router.get("/", response_model=List[ProjectOut])
async def read_projects(
    session: SessionDep,
    project_service: ProjectService = Depends(get_project_service),
    search: Optional[str] = None,
    tags: Optional[str] = None, # Comma-separated
    sort_by: str = "created_at",
    skip: int = 0,
    limit: int = 10,
) -> List[ProjectOut]:
    """
    Retrieve projects with advanced filtering. 
    Publicly accessible for the portfolio.
    """
    tag_list = tags.split(",") if tags else None
    
    return await project_service.get_multi(
        session,
        search=search,
        tags=tag_list,
        sort_by=sort_by,
        skip=skip,
        limit=limit
    )


@router.post("/", response_model=ProjectOut)
async def create_project(
    session: SessionDep,
    project_in: ProjectCreate,
    current_user: CurrentUser,
    project_service: ProjectService = Depends(get_project_service),
) -> ProjectOut:
    """
    Create new project.
    """
    return await project_service.create(
        session, obj_in=project_in, user_id=current_user.id
    )


@router.put("/{project_id}", response_model=ProjectOut)
async def update_project(
    session: SessionDep,
    project_id: UUID,
    project_in: ProjectUpdate,
    current_user: CurrentUser,
    project_service: ProjectService = Depends(get_project_service),
) -> ProjectOut:
    """
    Update a project.
    """
    project = await project_service.get(session, id=project_id, user_id=current_user.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return await project_service.update(session, db_obj=project, obj_in=project_in)


@router.delete("/{project_id}", response_model=ProjectOut)
async def delete_project(
    session: SessionDep,
    project_id: UUID,
    current_user: CurrentUser,
    project_service: ProjectService = Depends(get_project_service),
) -> ProjectOut:
    """
    Delete a project.
    """
    project = await project_service.get(session, id=project_id, user_id=current_user.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return await project_service.delete(session, db_obj=project)
