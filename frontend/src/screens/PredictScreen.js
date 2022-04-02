import { SchemaForm } from "@ascentcore/react-schema-form";
import React, { useEffect, useRef, useState } from "react";
import { getTargetIP } from "../api/API";
import { makeStyles } from "@mui/styles";
import { getSchemaForBlock, predict, predict_bg } from "../api/data";
import customRegistry from "../components/SchemaForm/CustomRegistry";
import MUIWrapper from "../components/SchemaForm/Components/wrappers/MUIWrapper";
import { Input, Button, Box } from "@mui/material";

export const useStyles = makeStyles((theme) => ({
  container: {
    "& .ra-form-title": {
      padding: '10px 10px',
      margin: '20px -10px',
      borderBottom: "1px solid rgb(200,200,200)",
      backgroundColor: "rgb(240,240,240)",
    },
    "& .ra-elem-array": {
      display: "block",
      width: "100%",
    },
  },
}));

let lastChanged = false;

function ScribbleComponent({ property, value, onChange }) {
  const BLOCK_SIZE = 10;

  const width = property.width * BLOCK_SIZE;
  const height = property.height * BLOCK_SIZE;

  const canvasRef = useRef(null);

  const [data, setData] = useState(
    new Array(property.width * property.height).fill(0)
  );
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < property.width; i++) {
      for (let j = 0; j < property.height; j++) {
        ctx.strokeStyle = "#808080";
        if (data[j * property.width + i] === 1) {
          ctx.fillStyle = "#000";
        } else {
          ctx.fillStyle = "#FFF";
        }

        ctx.fillRect(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeRect(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }, [data]);

  const handleClick = (event) => {
    if (mouseDown) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const col = Math.floor(x / BLOCK_SIZE);
      const row = Math.floor(y / BLOCK_SIZE);
      const currentPos = row * property.width + col;
      if (lastChanged !== currentPos) {
        lastChanged = currentPos;
        data[lastChanged] = data[lastChanged] === 1 ? 0 : 1;
        const newData = [...data];
        setData(newData);
        onChange(newData);
      }
    }
  };

  const handleMouseOp = (val) => () => {
    setMouseDown(val);
  };

  return (
    <canvas
      ref={canvasRef}
      width={property.width * BLOCK_SIZE}
      height={property.height * BLOCK_SIZE}
      onMouseDown={handleMouseOp(true)}
      onMouseUp={handleMouseOp(false)}
      onMouseMove={handleClick}
    />
  );
}
const PredictScreen = () => {
  const classes = useStyles();
  let ip = getTargetIP();
  const [schema, setSchema] = useState();
  const [data, setData] = useState({});
  const [hash, setHash] = useState(Math.random());
  const [predictResults, setPredictResults] = useState(false);

  const exceptions = {
    keys: {
      base64image: { component: ScribbleComponent, wrapper: MUIWrapper },
    },
  };

  useEffect(() => {
    if (!ip) return;
    async function fetchData() {
      const response = await getSchemaForBlock(ip);
      const { data } = response;
      data.properties["__PredictImmediately__"] = {
        title: "Predict Immediately",
        type: "boolean",
      };
      setSchema(response.data);
    }
    fetchData();
  }, [ip]);

  const onSubmit = async (data) => {
    let predictData = data;
    setPredictResults(false);

    let predictImmediately = false;
    if (data["__PredictImmediately__"]) {
      predictData = { ...data };
      predictImmediately = predictData["__PredictImmediately__"];
      delete predictData["__PredictImmediately__"];
    }

    if (predictImmediately) {
      const result = await predict(ip, predictData);
      console.log(JSON.stringify(result.data, null, 2));
      setPredictResults(JSON.stringify(result.data, null, 2));
    } else {
      predict_bg(ip, predictData);
    }
  };

  const handleChange = (evt) => {
    let reader = new FileReader();
    reader.readAsText(evt.target.files[0]);
    console.log("whoa?", evt.target.files[0]);
    reader.onload = function () {
      const jsonData = JSON.parse(reader.result);
      setData(jsonData);
      setHash(Math.random());
    };
  };

  return (
    <>
      <h2>
        Predict
        <Button sx={{ ml: 4 }} variant="contained" component="label">
          <Input
            style={{ display: "none" }}
            onChange={handleChange}
            type="file"
            hidden
          />
          Upload Predict
        </Button>
      </h2>
      <hr />
      {schema && (
        <SchemaForm
          className={classes.container}
          key={hash}
          data={data}
          schema={schema}
          onSubmit={onSubmit}
          config={{ registry: customRegistry, exceptions: exceptions }}
        />
      )}

      {predictResults && (
        <div>
          <h3>Results:</h3>
          <pre>{predictResults}</pre>
        </div>
      )}
    </>
  );
};

export default PredictScreen;
