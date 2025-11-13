const RefreshButton = () => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <button
      onClick={reloadPage}
      type="button"
      className="m-1 btn btn-outline-warning">
      <i className="bx bx-refresh me-1"></i> Refresh
    </button>
  );
};

export default RefreshButton;
