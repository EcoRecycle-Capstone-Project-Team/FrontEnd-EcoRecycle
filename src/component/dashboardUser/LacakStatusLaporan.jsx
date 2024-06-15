import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReportsAsync } from "../../redux/authSlice";
import { Badge, Card, Row, Col, Container, Alert } from "react-bootstrap";

function LacakStatusUser() {
  const dispatch = useDispatch();
  const { userReports, isLoading } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.userProfile?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserReportsAsync(userId));
    }
  }, [dispatch, userId]);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "danger";
      case "in_progress":
        return "warning";
      case "resolved":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusIconClass = (status) => {
    switch (status) {
      case "pending":
        return "fas fa-clock";
      case "in_progress":
        return "fas fa-list-check";
      case "resolved":
        return "fas fa-circle-check";
    }
  };

  const NoReportIllustration = () => (
    <div className="no-report-illustration">
      <img
        src="/assets/riwayat.png"
        style={{ width: "40%" }}
        alt="Illustration"
      />
      <p>
        Yah Anda belum memiliki Riwayat Laporan. Yuk laporkan masalah sampah
        anda!
      </p>
    </div>
  );

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Mohon Bersabar Ya, Laporan Anda masih belum diproses tunggu Follow Up dari Admin";
      case "in_progress":
        return "Yey Laporan Anda sedang diproses Oleh Petugas. Mohon bersabar Agar Masalah Sampah Anda Terselesaikan";
      case "resolved":
        return "Yeyy Laporan Anda sudah terselesaikan. Petugas Berhasil Menyelesaikan Masalah Sampah Anda";
      default:
        return "";
    }
  };

  const pendingInProgressReports = userReports.filter(
    (report) => report.status === "pending" || report.status === "in_progress"
  );

  const resolvedReports = userReports.filter(
    (report) => report.status === "resolved"
  );

  const singkatkanDeskripsi = (deskripsi, jumlahKata) => {
    return (
      deskripsi.split(" ").slice(0, jumlahKata).join(" ") +
      (deskripsi.split(" ").length > jumlahKata ? "..." : "")
    );
  };

  return (
    <>
      <section className="content">
        <div className="edit-profile-header">
          <h3 style={{ color: "#157347" }}>Riwayat Laporan Saya</h3>
        </div>
        <hr className="content-divider" />
        <div className="edit-options">
          {isLoading ? (
            <></>
          ) : (
            <>
              {userReports.length === 0 ? (
                <NoReportIllustration />
              ) : (
                <Container>
                  {pendingInProgressReports.length > 0 && (
                    <Alert variant="warning" className="text-center mb-4">
                      Anda memiliki {pendingInProgressReports.length} laporan
                      yang sedang diproses.
                      <i
                        className="fas fa-clock"
                        style={{ marginLeft: "10px" }}
                      ></i>
                    </Alert>
                  )}
                  <Row className="report-cards">
                    {pendingInProgressReports.map((report) => (
                      <Col key={report.id} xs={12} className="mb-3">
                        <Card className="report-card">
                          <Row className="no-gutters">
                            <Col md={4}>
                              <Card.Img
                                src={`https://api.ecorecycle.my.id/img/${report.img_bukti}`}
                                alt="Report Image"
                                className="report-img"
                              />
                            </Col>
                            <Col md={6} style={{ marginLeft: "-1rem" }}>
                              <Card.Body>
                                <h4 style={{ color: "#212529" }}>
                                  <td>
                                    <i
                                      className="fas fa-file-lines"
                                      style={{ marginRight: "10px" }}
                                    ></i>
                                    {singkatkanDeskripsi(report.deskripsi, 3)}
                                  </td>
                                </h4>
                                <div className="status-message">
                                  <small>
                                    <i
                                      className="fas fa-award"
                                      style={{
                                        marginRight: "8px",
                                        color: "#ffc107",
                                      }}
                                    ></i>
                                    {getStatusMessage(report.status)}
                                  </small>
                                </div>
                                <i
                                  className="fas fa-chart-simple"
                                  style={{
                                    marginRight: "8px",
                                    fontSize: "1.4rem",
                                  }}
                                ></i>
                                <Badge
                                  className="status-badge mt-3"
                                  bg={getStatusBadgeVariant(report.status)}
                                >
                                  {report.status}
                                </Badge>
                              </Card.Body>
                            </Col>
                            <Col
                              md={2}
                              className="text-center d-flex align-items-center justify-content-center"
                            >
                              <i
                                className={`${getStatusIconClass(
                                  report.status
                                )} profile-option-icon icon`}
                                style={{ fontSize: "3rem" }}
                              ></i>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  {resolvedReports.length > 0 && (
                    <>
                      <hr className="content-divider" />

                      <Alert variant="success" className="text-center mb-4">
                        {resolvedReports.length} laporan terselesaikan
                        <i
                          className="fas fa-circle-check"
                          style={{ marginLeft: "10px" }}
                        ></i>
                      </Alert>

                      <Row className="report-cards">
                        {resolvedReports.map((report) => (
                          <Col key={report.id} xs={12} className="mb-3">
                            <Card className="report-card">
                              <Row className="no-gutters">
                                <Col md={4}>
                                  <Card.Img
                                    src={`https://api.ecorecycle.my.id/img/${report.img_bukti}`}
                                    alt="Report Image"
                                    className="report-img"
                                  />
                                </Col>
                                <Col md={6} style={{ marginLeft: "-1rem" }}>
                                  <Card.Body>
                                    <h4 style={{ color: "#212529" }}>
                                      <i
                                        className="fas fa-file-lines"
                                        style={{ marginRight: "10px" }}
                                      ></i>
                                      {singkatkanDeskripsi(report.deskripsi, 3)}
                                    </h4>
                                    <div className="status-message">
                                      <small>
                                        <i
                                          className="fas fa-award"
                                          style={{
                                            marginRight: "8px",
                                            color: "#ffc107",
                                          }}
                                        ></i>
                                        {getStatusMessage(report.status)}
                                      </small>
                                    </div>
                                    <i
                                      className="fas fa-chart-simple"
                                      style={{
                                        marginRight: "8px",
                                        fontSize: "1.4rem",
                                      }}
                                    ></i>
                                    <Badge
                                      className="status-badge mt-3"
                                      bg={getStatusBadgeVariant(report.status)}
                                    >
                                      {report.status}
                                    </Badge>
                                  </Card.Body>
                                </Col>
                                <Col
                                  md={2}
                                  className="text-center d-flex align-items-center justify-content-center"
                                >
                                  <i
                                    className={`${getStatusIconClass(
                                      report.status
                                    )} profile-option-icon icon`}
                                    style={{ fontSize: "3rem" }}
                                  ></i>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
                </Container>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default LacakStatusUser;
