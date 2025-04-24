import { useNavigate } from 'react-router';
import Button from '../shared/Button';

function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr;Back
    </Button>
  );
}
export default ButtonBack;
