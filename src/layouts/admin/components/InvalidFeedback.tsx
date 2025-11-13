interface Message {
  msg: string;
}
const InvalidFeedback = ({ msg }: Message) => {
  return (
    <div className="text-danger fw-lighter fs-6 lh-sm">{msg || "Error"}</div>
  );
};

export default InvalidFeedback;
