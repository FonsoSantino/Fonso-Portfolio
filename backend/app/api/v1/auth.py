from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.core import security
from app.core.config import settings
from app.schemas.token import Token
from app.schemas.user import UserOut, UserCreate
from app.services.auth_service import AuthService
from app.api.deps import SessionDep, CurrentUser, get_auth_service

router = APIRouter()

@router.post("/login/access-token", response_model=Token)
async def login_access_token(
    response: Response,
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    auth_service: AuthService = Depends(get_auth_service),
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = await auth_service.authenticate_user(
        session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.email, expires_delta=access_token_expires
    )
    
    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=False,  # Set to False for local development without HTTPS
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
    )

@router.post("/register", response_model=UserOut)
async def register_user(
    session: SessionDep,
    user_in: UserCreate,
    auth_service: AuthService = Depends(get_auth_service),
) -> UserOut:
    """
    Register a new user
    """
    user = await auth_service.get_user_by_email(session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system",
        )
    user = await auth_service.create_user(session, user_in)
    return user

@router.get("/me", response_model=UserOut)
async def read_users_me(current_user: CurrentUser) -> UserOut:
    """
    Get current user
    """
    return current_user
