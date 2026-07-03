"""Shared FastAPI dependencies."""
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .database import get_supabase

security = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> dict:
    """Validate the Supabase JWT and return the user + profile."""
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    sb = get_supabase()
    try:
        res = sb.auth.get_user(credentials.credentials)
        user = res.user
    except Exception:
        user = None
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    prof = sb.table("profiles").select("*").eq("id", user.id).execute()
    return {
        "id": user.id,
        "email": user.email,
        "profile": prof.data[0] if prof.data else None,
    }


def require_project_owner(project_id: str, user_id: str) -> dict:
    sb = get_supabase()
    res = sb.table("projects").select("*").eq("id", project_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Project not found")
    project = res.data[0]
    if project["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not your project")
    return project
