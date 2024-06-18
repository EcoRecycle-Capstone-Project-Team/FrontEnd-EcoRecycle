import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table, Badge } from "react-bootstrap";
import {
  getDashboardStatsAsync,
  getAllPelaporanSampahAsync,
} from "../../redux/authSlice";
import "./styles.css";
import Loading from "../loading/Loading";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  let reportNumber = 0;

  const { dashboardStats = {}, pelaporanSampah } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token) {
      dispatch(getDashboardStatsAsync(token));
      dispatch(getAllPelaporanSampahAsync());
    }
  }, [dispatch, token]);

  const getLatestReports = (reports) => {
    if (!reports || reports.length === 0) {
      return [];
    }
    return reports.slice(-3);
  };

  const latestReports = getLatestReports(pelaporanSampah);

  const getBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "danger";
      case "in_progress":
        return "warning";
      case "resolved":
        return "success";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <main
      role="main"
      className="main-content col-md-9 ml-sm-auto col-lg-10 px-md-4"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <div className="row">
        <div className="col-md-4 mb-4">
          <Card bg="primary" text="white" className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Total Laporan</h5>
                  <p className="card-text">{dashboardStats.totalReports}</p>
                </div>
                <i className="fas fa-file-alt fa-3x"></i>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card bg="success" text="white" className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Laporan Terselesaikan</h5>
                  <p className="card-text">
                    {dashboardStats.totalCompletedReports}
                  </p>
                </div>
                <i className="fas fa-check-circle fa-3x"></i>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card bg="info" text="white" className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Pengguna Aktif</h5>
                  <p className="card-text">{dashboardStats.totalUsers}</p>
                </div>
                <i className="fas fa-users fa-3x"></i>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <h2>Laporan Terbaru</h2>
      <Card>
        <Card.Header>Tabel 3 Data Laporan Sampah Terbaru</Card.Header>
        <Card.Body style={{ marginTop: "-1rem" }}>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Pengguna</th>
                  <th>Deskripsi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {latestReports.map((report) => {
                  reportNumber++;
                  return (
                    <tr key={report.id}>
                      <td>{reportNumber}</td>
                      <td>{report.nama_pelapor}</td>
                      <td>{report.deskripsi}</td>
                      <td>
                        <Badge bg={getBadgeVariant(report.status)}>
                          {report.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </main>
  );
};

export default DashboardContent;
