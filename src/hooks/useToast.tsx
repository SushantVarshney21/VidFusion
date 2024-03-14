import React from "react";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { setToasts } from "../app/slices/MeetingSlice";

export default function useToast() {
  const toasts = useAppSelector((zoom360) => zoom360.meetings.toasts);
  const dispatch = useDispatch();

  const createToast = ({ title, type }: { title: string; type: any }) => {
    dispatch(
      setToasts(
        toasts.concat({ id: new Date().toISOString(), title, color: type })
      )
    );
  };
  return [createToast];
}
