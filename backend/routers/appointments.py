from typing import Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import AppointmentCreate, AppointmentResponse, AppointmentListResponse
from auth import get_current_active_user, get_optional_current_user
import crud

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("/", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: AppointmentCreate,
    db: Session = Depends(get_db),
    optional_user: Optional[User] = Depends(get_optional_current_user),
):
    """
    Request a travel consultation / booking appointment.
    Send `Authorization: Bearer <token>` to attach the booking to your account.
    """
    user_id = optional_user.id if optional_user else None
    appt = crud.create_appointment(db, payload, user_id=user_id)
    return appt


@router.get("/me", response_model=AppointmentListResponse)
def list_my_appointments(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """List appointments linked to the authenticated user."""
    result = crud.get_appointments_for_user(db, current_user.id, skip=skip, limit=limit)
    return {"appointments": result["appointments"], "total": result["total"]}
