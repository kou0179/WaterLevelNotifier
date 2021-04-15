import Obniz from "obniz";
import { launchSound, startAlert } from "./Grove_Buzzer.extensions.js";
import { sendMessage } from "./lineNotifyClient.js";
import { GroveBuzzerAlertStopHandler } from "./types.js";

const OBNIZ_ID = "0000-0000"; // OBNIZ ID
const LINE_TOKEN = ""; // LINE Notifyのトークン
const ALERT_THRESHOLD = 30;

const obniz = new Obniz(OBNIZ_ID);

obniz.onconnect = async function () {
  const buzzer = obniz.wired("Grove_Buzzer", { gnd: 0, vcc: 1, signal: 3 });
  const sensor = obniz.wired("Grove_WaterLevelSensor", {
    gnd: 4,
    vcc: 5,
    sda: 6,
    scl: 7,
  });
  let alertStopHandler: GroveBuzzerAlertStopHandler | null = null;

  await launchSound(buzzer, obniz);
  await sendMessage({
    token: LINE_TOKEN,
    message: "監視を開始します",
    notificationDisabled: true,
  });

  // called while online.
  obniz.onloop = async function () {};

  sensor.onchange = async function (value) {
    console.log(value);
    if (value >= ALERT_THRESHOLD) {
      await alertOn();
    } else {
      await alertOff();
    }
  };

  async function alertOn() {
    if (alertStopHandler === null) {
      alertStopHandler = await startAlert(buzzer, obniz);
      sendMessage({
        token: LINE_TOKEN,
        message: "水が溢れそうです！！！！！",
        notificationDisabled: false,
      });
    }
  }

  async function alertOff() {
    if (alertStopHandler !== null) {
      await alertStopHandler();
    }
  }
};

// called on offline
obniz.onclose = async function () {};
