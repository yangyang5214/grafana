import { css } from '@emotion/css';
import React, { useEffect, useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Alert, AlertVariant, useTheme2 } from '@grafana/ui';

enum AlertTimeout {
  Error = 7000,
  Info = 3000,
  Success = 3000,
  Warning = 5000,
}

const getStyle = (theme: GrafanaTheme2) => {
  return css({
    position: 'absolute',
    zIndex: theme.zIndex.portal,
    top: 0,
    right: 10,
  });
};

const timeoutMap = {
  ['error']: AlertTimeout.Error,
  ['info']: AlertTimeout.Info,
  ['success']: AlertTimeout.Success,
  ['warning']: AlertTimeout.Warning,
};

export const TemporaryAlert = (props: { severity: AlertVariant; text: string }) => {
  const style = getStyle(useTheme2());
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    if (props.text !== '') {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, timeoutMap[props.severity]);
      setTimer(timer);
    }
  }, [props.severity, props.text]);

  return <>{visible && <Alert className={style} elevated={true} title={props.text} severity={props.severity} />}</>;
};
