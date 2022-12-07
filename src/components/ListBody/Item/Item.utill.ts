import { Dispatch } from "react";
import { PayloadBody } from '../../../redux/slice/toDoSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

type AttributeData = string | undefined | null;

function makeMouseEventHandler(dispatcher: Dispatch<PayloadBody>, action: ActionCreatorWithPayload<PayloadBody, string>) {
  return (evt: MouseEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    const attrId: AttributeData = target.getAttribute("id");
    if (attrId) {
      const payload: PayloadBody = {
        id: attrId,
        text: ''
      }

      // dispatcher(action(payload));
    }

  }
}