import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserReportsAsync,
  deleteUserReportByIdAsync,
} from "../../redux/authSlice";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const NoReportIllustration = () => (
  <div className="no-report-illustration">
    <img
      src="/assets/no-report.png"
      alt="Illustration"
      className="img-infodata"
    />
    <p>Yah Anda belum memiliki laporan. Yuk laporkan masalah sampah anda!</p>
  </div>
);

const LaporanSaya = () => {
  const dispatch = useDispatch();
  const { userReports, isLoading } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.userProfile?.id);

  let reportNumber = 0;

  useEffect(() => {
    if (userId) {
      dispatch(getUserReportsAsync(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = (reportId) => {
    if (reportId) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUserReportByIdAsync(reportId));
          Swal.fire({
            title: "Dihapus!",
            text: "Data Anda telah dihapus.",
            icon: "success",
            timer: 2000,
          });
        }
      });
    }
  };

  return (
    <>
      <section className="content">
        <div className="edit-profile-header">
          <h3 style={{ color: "#157347" }}>Daftar Laporan Saya</h3>
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
                <div className="table-responsive">
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th style={{ width: "9rem" }}>Nama Pelapor</th>
                        <th>Deskripsi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userReports.map((report) => {
                        reportNumber++;
                        return (
                          <tr key={report.id}>
                            <td>{reportNumber}</td>
                            <td>{report.nama_pelapor}</td>
                            <td>{report.deskripsi}</td>
                            <td>{report.status}</td>
                            <td>
                              <Button
                                className="btn-danger btn-sm"
                                onClick={() => handleDelete(report.id)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default LaporanSaya;
