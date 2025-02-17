import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  Tooltip,
  IconButton,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Grid,
} from '@mui/material';
import { systemClient } from '../../services/System';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { AppContext, type UseAppStoreType } from '../../contexts/AppContext';

interface Props {
  open: boolean;
  onClose: () => void;
  onClickBack: () => void;
  onClickDone: () => void;
}

const StoreTokenDialog = ({ open, onClose, onClickBack, onClickDone }: Props): JSX.Element => {
  const { robot } = useContext<UseAppStoreType>(AppContext);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('Store your robot token')}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {t(
            'You might need to recover your robot avatar in the future: store it safely. You can simply copy it into another application.',
          )}
        </DialogContentText>
        <br />
        <Grid container>
          <TextField
            sx={{ width: '100%', maxWidth: '550px' }}
            disabled
            label={t('Back it up!')}
            value={robot.token}
            variant='filled'
            size='small'
            InputProps={{
              endAdornment: (
                <Tooltip disableHoverListener enterTouchDelay={0} title={t('Copied!')}>
                  <IconButton
                    onClick={() => {
                      systemClient.copyToClipboard(robot.token);
                    }}
                  >
                    <ContentCopy color='primary' />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClickBack} autoFocus>
          {t('Go back')}
        </Button>
        <Button onClick={onClickDone}>{t('Done')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreTokenDialog;
