import { Grid, Snackbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as ToasterActions from "../redux/actions/ToasterActions";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Toaster = () => {
  const dispatch = useDispatch();
  const toasterInfo = useSelector((state) => state.ToasterReducer);

  const handleClose = () => dispatch(ToasterActions.PopToaster());

  return (
    <>
      {toasterInfo && toasterInfo.type && (
        <Snackbar
          open={toasterInfo.open}
          autoHideDuration={toasterInfo.duration}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClick={handleClose}
        >
          <Alert severity={toasterInfo.type}>
            {toasterInfo.message}
            <CloseIcon />
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Toaster;
