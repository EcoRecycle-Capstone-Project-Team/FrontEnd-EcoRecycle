import { useSelector, useDispatch } from "react-redux";
import {
  getUserReportsTPAAsync,
  deleteUserReportTPAAsync,
} from "../../redux/authSlice";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const NoReportIllustration = () => (
  <div className="no-report-illustration">
    <img
      src="/assets/no-location-report.png"
      style={{ width: "40%" }}
      alt="Illustration"
    />
    <p>Yah Anda belum memiliki Kontribusi. Yuk tambahkan TPA di sekitar anda</p>
  </div>
);

const KontribusiLokasiSaya = () => {
  const dispatch = useDispatch();
  const { userReportsTPA, isLoading } = useSelector((state) => state.auth);

  let reportNumber = 0;

  const userId = useSelector((state) => state.auth.userProfile?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserReportsTPAAsync(userId));
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
          dispatch(deleteUserReportTPAAsync(reportId));
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
          <h3 style={{ color: "#157347" }}>Daftar Kontribusi Titik TPA Saya</h3>
        </div>
        <hr className="content-divider" />
        <div className="edit-options">
          {isLoading ? (
            <></>
          ) : (
            <>
              {userReportsTPA.length === 0 ? (
                <NoReportIllustration />
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th style={{ width: "9rem" }}>Nama Pelapor</th>
                        <th>Jenis Lokasi</th>
                        <th>Nama Lokasi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userReportsTPA.map((report) => {
                        reportNumber++;
                        return (
                          <tr key={report.id}>
                            <td>{reportNumber}</td>
                            <td>{report.nama_pelapor}</td>
                            <td>{report.jenis_lokasi}</td>
                            <td>{report.nama_lokasi}</td>
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

export default KontribusiLokasiSaya;
