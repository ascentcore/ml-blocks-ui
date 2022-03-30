import React, { useEffect, useState } from "react";
import { getTargetIP } from "../api/API";
import * as getIP from "../api/data";
import { makeStyles } from "@mui/styles";
import { Grid, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Link } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const useStyles = makeStyles((theme) => ({
  list: {
    width: "300px",
    marginTop: "100px",
  },
  image: {
    // maxWidth: "100%",
    // height: "auto",
    height: 50,
  },
  search: {
    marginBottom: "30px",
    width: "300px",
  },
}));

const StaticsScreen = () => {
  const classes = useStyles();
  const [filteredItems, setFilteredItems] = useState();

  let ip = getTargetIP();

  useEffect(() => {
    if (ip === undefined && path === "") return;
    async function fetchData() {
      const response = await getIP.getProxy(ip, "api/v1/statics/");
      setFilteredItems(response.data);
    }

    fetchData();
  }, [ip]);

  const getIconForFile = (item) => {
    const re = /(?:\.([^.]+))?$/;
    const extension = re.exec(item)[1];
    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
        return (
          <img
            className={classes.image}
            src={`/proxy/${ip}/api/v1/download/${item}`}
          />
        );

      default:
        return "";
    }
  };

  return (
    <>
      {filteredItems && filteredItems.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Creation Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item[1]}>
                    <TableCell>{getIconForFile(item[1])}</TableCell>
                    <TableCell>
                      <Link
                        to={`/proxy/${ip}/api/v1/download/${item[1]}`}
                        target="_blank"
                      >
                        {" "}
                        {item[1]}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {moment.unix(item[2]).format("MMM DD HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h3>No static resources</h3>
      )}
    </>
  );
};

export default StaticsScreen;
