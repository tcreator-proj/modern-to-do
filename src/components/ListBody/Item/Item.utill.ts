import { PayloadBody } from '../../../redux/slice/toDoSlice';

type AttributeData = string | undefined | null;

export function getTargetPayloadBody(target: HTMLInputElement): PayloadBody {
  const attrId: AttributeData = target.getAttribute("id");
  const payload: PayloadBody = {
    id: '',
    text: ''
  }
  if (!attrId) return payload;
  
  payload.id = attrId;
  if (target.value) {
    payload.text = target.value;
  }

  return payload;
}