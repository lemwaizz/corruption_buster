import { MESSAGE_DELTA_CREATED } from '@app/constants';

export interface CommunicationServerToClientEvents {
  [MESSAGE_DELTA_CREATED]: (message: string) => void;
}
