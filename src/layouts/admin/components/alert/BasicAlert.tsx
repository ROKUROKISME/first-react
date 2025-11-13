
interface AlertButtonProps {
  msg: string;
  variant: string;
}

const BasicAlert = ({ msg, variant }: AlertButtonProps) => {
  return (
    <div
      className={`alert alert-${
        variant
      } alert-dismissible fade show`}
      role="alert">
      <strong>{msg}</strong>
      <button type="button" className="btn-close" data-bs-dismiss="alert" />
    </div>
  );
};

export default BasicAlert;