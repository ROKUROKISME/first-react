import Cookies from "js-cookie"


const Home = () => {

  const token = Cookies.get("token"); 
  
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="mb-4 col-lg-8 order-0">
          <div className="card">
            <div className="d-flex align-items-end row">
              <div className="col-sm-7">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Congratulations John! 🎉
                  </h5>
                  <p className="mb-4">
                    You have done <span className="fw-bold">72% </span>
                    more sales today. Check your new badge in your profile.
                    {token}
                  </p>
                  <a
                    href="javascript:;"
                    className="btn btn-sm btn-outline-primary">
                    View Badges
                  </a>
                </div>
              </div>
              <div className="text-center col-sm-5 text-sm-left">
                <div className="px-0 pb-0 card-body px-md-4">
                  <img
                    src="/sneat/assets/img/illustrations/man-with-laptop-light.png"
                    height={140}
                    alt="View Badge User"
                    data-app-dark-img="illustrations/man-with-laptop-dark.png"
                    data-app-light-img="illustrations/man-with-laptop-light.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 col-lg-4 col-md-4">
          <div className="row">
            <div className="mb-4 col-lg-6 col-md-12 col-6">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="flex-shrink-0 avatar">
                      <img
                        src="/sneat/assets/img/icons/unicons/chart-success.png"
                        alt="chart success"
                        className="rounded"
                      />
                    </div>
                    <div className="dropdown">
                      <button
                        className="p-0 btn"
                        type="button"
                        id="cardOpt3"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="cardOpt3">
                        <a className="dropdown-item" href="javascript:void(0);">
                          View More
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                  <span className="mb-1 fw-semibold d-block">Profit</span>
                  <h3 className="mb-2 card-title">$12,628</h3>
                  <small className="text-success fw-semibold">
                    <i className="bx bx-up-arrow-alt" /> +72.80%
                  </small>
                </div>
              </div>
            </div>
            <div className="mb-4 col-lg-6 col-md-12 col-6">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="flex-shrink-0 avatar">
                      <img
                        src="/sneat/assets/img/icons/unicons/wallet-info.png"
                        alt="Credit Card"
                        className="rounded"
                      />
                    </div>
                    <div className="dropdown">
                      <button
                        className="p-0 btn"
                        type="button"
                        id="cardOpt6"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="cardOpt6">
                        <a className="dropdown-item" href="javascript:void(0);">
                          View More
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                  <span>Sales</span>
                  <h3 className="mb-1 card-title text-nowrap">$4,679</h3>
                  <small className="text-success fw-semibold">
                    <i className="bx bx-up-arrow-alt" /> +28.42%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Total Revenue */}
        <div className="order-2 mb-4 col-12 col-lg-8 order-md-3 order-lg-2">
          <div className="card">
            <div className="row row-bordered g-0">
              <div className="col-md-8">
                <h5 className="pb-3 m-0 card-header me-2">Total Revenue</h5>
                <div id="totalRevenueChart" className="px-2" />
              </div>
              <div className="col-md-4">
                <div className="card-body">
                  <div className="text-center">
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-primary dropdown-toggle"
                        type="button"
                        id="growthReportId"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        2022
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="growthReportId">
                        <a className="dropdown-item" href="javascript:void(0);">
                          2021
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          2020
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          2019
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="growthChart" />
                <div className="pt-3 mb-2 text-center fw-semibold">
                  62% Company Growth
                </div>
                <div className="gap-3 p-4 d-flex px-xxl-4 px-lg-2 gap-xxl-3 gap-lg-1 justify-content-between">
                  <div className="d-flex">
                    <div className="me-2">
                      <span className="p-2 badge bg-label-primary">
                        <i className="bx bx-dollar text-primary" />
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <small>2022</small>
                      <h6 className="mb-0">$32.5k</h6>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="me-2">
                      <span className="p-2 badge bg-label-info">
                        <i className="bx bx-wallet text-info" />
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <small>2021</small>
                      <h6 className="mb-0">$41.2k</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/ Total Revenue */}
        <div className="order-3 col-12 col-md-8 col-lg-4 order-md-2">
          <div className="row">
            <div className="mb-4 col-6">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="flex-shrink-0 avatar">
                      <img
                        src="/sneat/assets/img/icons/unicons/paypal.png"
                        alt="Credit Card"
                        className="rounded"
                      />
                    </div>
                    <div className="dropdown">
                      <button
                        className="p-0 btn"
                        type="button"
                        id="cardOpt4"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="cardOpt4">
                        <a className="dropdown-item" href="javascript:void(0);">
                          View More
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                  <span className="mb-1 d-block">Payments</span>
                  <h3 className="mb-2 card-title text-nowrap">$2,456</h3>
                  <small className="text-danger fw-semibold">
                    <i className="bx bx-down-arrow-alt" /> -14.82%
                  </small>
                </div>
              </div>
            </div>
            <div className="mb-4 col-6">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="flex-shrink-0 avatar">
                      <img
                        src="/sneat/assets/img/icons/unicons/cc-primary.png"
                        alt="Credit Card"
                        className="rounded"
                      />
                    </div>
                    <div className="dropdown">
                      <button
                        className="p-0 btn"
                        type="button"
                        id="cardOpt1"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <i className="bx bx-dots-vertical-rounded" />
                      </button>
                      <div className="dropdown-menu" aria-labelledby="cardOpt1">
                        <a className="dropdown-item" href="javascript:void(0);">
                          View More
                        </a>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                  <span className="mb-1 fw-semibold d-block">Transactions</span>
                  <h3 className="mb-2 card-title">$14,857</h3>
                  <small className="text-success fw-semibold">
                    <i className="bx bx-up-arrow-alt" /> +28.14%
                  </small>
                </div>
              </div>
            </div>
            {/* </div>
        <div class="row"> */}
            <div className="mb-4 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="gap-3 d-flex justify-content-between flex-sm-row flex-column">
                    <div className="flex-row d-flex flex-sm-column align-items-start justify-content-between">
                      <div className="card-title">
                        <h5 className="mb-2 text-nowrap">Profile Report</h5>
                        <span className="badge bg-label-warning rounded-pill">
                          Year 2021
                        </span>
                      </div>
                      <div className="mt-sm-auto">
                        <small className="text-success text-nowrap fw-semibold">
                          <i className="bx bx-chevron-up" /> 68.2%
                        </small>
                        <h3 className="mb-0">$84,686k</h3>
                      </div>
                    </div>
                    <div id="profileReportChart" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Order Statistics */}
        <div className="mb-4 col-md-6 col-lg-4 col-xl-4 order-0">
          <div className="card h-100">
            <div className="pb-0 card-header d-flex align-items-center justify-content-between">
              <div className="mb-0 card-title">
                <h5 className="m-0 me-2">Order Statistics</h5>
                <small className="text-muted">42.82k Total Sales</small>
              </div>
              <div className="dropdown">
                <button
                  className="p-0 btn"
                  type="button"
                  id="orederStatistics"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <i className="bx bx-dots-vertical-rounded" />
                </button>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="orederStatistics">
                  <a className="dropdown-item" href="javascript:void(0);">
                    Select All
                  </a>
                  <a className="dropdown-item" href="javascript:void(0);">
                    Refresh
                  </a>
                  <a className="dropdown-item" href="javascript:void(0);">
                    Share
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="gap-1 d-flex flex-column align-items-center">
                  <h2 className="mb-2">8,258</h2>
                  <span>Total Orders</span>
                </div>
                <div id="orderStatisticsChart" />
              </div>
              <ul className="p-0 m-0">
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <span className="rounded avatar-initial bg-label-primary">
                      <i className="bx bx-mobile-alt" />
                    </span>
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <h6 className="mb-0">Electronic</h6>
                      <small className="text-muted">Mobile, Earbuds, TV</small>
                    </div>
                    <div className="user-progress">
                      <small className="fw-semibold">82.5k</small>
                    </div>
                  </div>
                </li>
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <span className="rounded avatar-initial bg-label-success">
                      <i className="bx bx-closet" />
                    </span>
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <h6 className="mb-0">Fashion</h6>
                      <small className="text-muted">
                        T-shirt, Jeans, Shoes
                      </small>
                    </div>
                    <div className="user-progress">
                      <small className="fw-semibold">23.8k</small>
                    </div>
                  </div>
                </li>
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <span className="rounded avatar-initial bg-label-info">
                      <i className="bx bx-home-alt" />
                    </span>
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <h6 className="mb-0">Decor</h6>
                      <small className="text-muted">Fine Art, Dining</small>
                    </div>
                    <div className="user-progress">
                      <small className="fw-semibold">849k</small>
                    </div>
                  </div>
                </li>
                <li className="d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <span className="rounded avatar-initial bg-label-secondary">
                      <i className="bx bx-football" />
                    </span>
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <h6 className="mb-0">Sports</h6>
                      <small className="text-muted">
                        Football, Cricket Kit
                      </small>
                    </div>
                    <div className="user-progress">
                      <small className="fw-semibold">99</small>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*/ Order Statistics */}
        {/* Expense Overview */}
        <div className="order-1 mb-4 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link active"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-tabs-line-card-income"
                    aria-controls="navs-tabs-line-card-income"
                    aria-selected="true">
                    Income
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link" role="tab">
                    Expenses
                  </button>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link" role="tab">
                    Profit
                  </button>
                </li>
              </ul>
            </div>
            <div className="px-0 card-body">
              <div className="p-0 tab-content">
                <div
                  className="tab-pane fade show active"
                  id="navs-tabs-line-card-income"
                  role="tabpanel">
                  <div className="p-4 pt-3 d-flex">
                    <div className="flex-shrink-0 avatar me-3">
                      <img
                        src="/sneat/assets/img/icons/unicons/wallet.png"
                        alt="User"
                      />
                    </div>
                    <div>
                      <small className="text-muted d-block">
                        Total Balance
                      </small>
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0 me-1">$459.10</h6>
                        <small className="text-success fw-semibold">
                          <i className="bx bx-chevron-up" />
                          42.9%
                        </small>
                      </div>
                    </div>
                  </div>
                  <div id="incomeChart" />
                  <div className="gap-2 pt-4 d-flex justify-content-center">
                    <div className="flex-shrink-0">
                      <div id="expensesOfWeek" />
                    </div>
                    <div>
                      <p className="mt-1 mb-n1">Expenses This Week</p>
                      <small className="text-muted">
                        $39 less than last week
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/ Expense Overview */}
        {/* Transactions */}
        <div className="order-2 mb-4 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="m-0 card-title me-2">Transactions</h5>
              <div className="dropdown">
                <button
                  className="p-0 btn"
                  type="button"
                  id="transactionID"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <i className="bx bx-dots-vertical-rounded" />
                </button>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="transactionID">
                  <a className="dropdown-item" href="javascript:void(0);">
                    Last 28 Days
                  </a>
                  <a className="dropdown-item" href="javascript:void(0);">
                    Last Month
                  </a>
                  <a className="dropdown-item" href="javascript:void(0);">
                    Last Year
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <ul className="p-0 m-0">
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <img
                      src="/sneat/assets/img/icons/unicons/paypal.png"
                      alt="User"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <small className="mb-1 text-muted d-block">Paypal</small>
                      <h6 className="mb-0">Send money</h6>
                    </div>
                    <div className="gap-1 user-progress d-flex align-items-center">
                      <h6 className="mb-0">+82.6</h6>
                      <span className="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <img
                      src="/sneat/assets/img/icons/unicons/wallet.png"
                      alt="User"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <small className="mb-1 text-muted d-block">Wallet</small>
                      <h6 className="mb-0">Mac'D</h6>
                    </div>
                    <div className="gap-1 user-progress d-flex align-items-center">
                      <h6 className="mb-0">+270.69</h6>
                      <span className="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <img
                      src="/sneat/assets/img/icons/unicons/chart.png"
                      alt="User"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <small className="mb-1 text-muted d-block">
                        Transfer
                      </small>
                      <h6 className="mb-0">Refund</h6>
                    </div>
                    <div className="gap-1 user-progress d-flex align-items-center">
                      <h6 className="mb-0">+637.91</h6>
                      <span className="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <img
                      src="/sneat/assets/img/icons/unicons/cc-success.png"
                      alt="User"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <small className="mb-1 text-muted d-block">
                        Credit Card
                      </small>
                      <h6 className="mb-0">Ordered Food</h6>
                    </div>
                    <div className="gap-1 user-progress d-flex align-items-center">
                      <h6 className="mb-0">-838.71</h6>
                      <span className="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li className="pb-1 mb-4 d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <img
                      src="/sneat/assets/img/icons/unicons/wallet.png"
                      alt="User"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <small className="mb-1 text-muted d-block">Wallet</small>
                      <h6 className="mb-0">Starbucks</h6>
                    </div>
                    <div className="gap-1 user-progress d-flex align-items-center">
                      <h6 className="mb-0">+203.33</h6>
                      <span className="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li className="d-flex">
                  <div className="flex-shrink-0 avatar me-3">
                    <img
                      src="/sneat/assets/img/icons/unicons/cc-warning.png"
                      alt="User"
                      className="rounded"
                    />
                  </div>
                  <div className="flex-wrap gap-2 d-flex w-100 align-items-center justify-content-between">
                    <div className="me-2">
                      <small className="mb-1 text-muted d-block">
                        Mastercard
                      </small>
                      <h6 className="mb-0">Ordered Food</h6>
                    </div>
                    <div className="gap-1 user-progress d-flex align-items-center">
                      <h6 className="mb-0">-92.45</h6>
                      <span className="text-muted">USD</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*/ Transactions */}
      </div>
    </div>
  );
}
export default Home;
