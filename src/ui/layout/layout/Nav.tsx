import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "ui/router";

const options = routes.map((route) => ({
  label: route.title,
  value: route.path,
}));

export const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = useCallback(
    (value: SegmentedValue) => {
      navigate(value?.toString());
    },
    [navigate],
  );

  return (
    <Segmented
      value={location.pathname}
      options={options}
      onChange={onChange}
      size="small"
    />
  );
};
