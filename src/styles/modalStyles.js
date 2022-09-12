import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  modalBoxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: '50%',
    top: '50%',
    width: 900,
    padding: 30,
    borderRadius: 10,
  },

  inputFields: {
    width: '80%',
  },

  inputFieldsContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  containedInputFields: {
    width: '45%',
  },

  numberInputs: {
    width: '80%',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'textfield',
  },

  buttonsContainer: {
    alignSelf: 'flex-end',
    marginRight: '80px',
    display: 'flex',
    gap: '30px',
  },

  readMore: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'start',
    gap: '50px',
    width: '100%',
  },
});

export default useStyles;
