import Obniz from 'obniz'
import Grove_Buzzer from "obniz/dist/src/parts/Grove/Grove_Buzzer"
import { GroveBuzzerAlertStopHandler } from './types';


export const launchSound = async function (buzzer: Grove_Buzzer, obniz: Obniz): Promise<void> {
  buzzer.play(3200);
  await obniz.wait(300);
  buzzer.stop();
  return
};

export const startAlert = async function (buzzer: Grove_Buzzer, obniz: Obniz): Promise<GroveBuzzerAlertStopHandler> {
  let alertCancelRequest = false;
  (async () => {
    while (!alertCancelRequest) {
      buzzer.play(2800); //rec 3000
      await obniz.wait(300);
      buzzer.stop();
      await obniz.wait(200);
    }
  })();
  return () => {
    alertCancelRequest = true;
  };
};

