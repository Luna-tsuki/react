import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

const CategoryPro = () => {
  //初始值
  const initialState = [
    {
      categoryId: 15,
      categoryName: "家电",
      categoryImage:
        "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
      parentId: 0,
      subList: [
        {
          categoryId: 23,
          categoryName: "冰箱",
          categoryImage: null,
          parentId: 15,
        },
        {
          categoryId: 24,
          categoryName: "电视机",
          categoryImage: null,
          parentId: 15,
        },
      ],
    },
    {
      categoryId: 17,
      categoryName: "数码",
      categoryImage:
        "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
      parentId: 0,
      subList: [
        {
          categoryId: 18,
          categoryName: "手机",
          categoryImage: null,
          parentId: 17,
        },
      ],
    },
  ];
  const [categorys, setCategorys] = useState(initialState);

  //二级menu
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    console.log(children);
    console.log(value);
    console.log(index);
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  //一级menu
  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  //设置二级menu的value值
  const [value, setValue] = React.useState(15);
  //点击切换二级menu
  const handleChange = (event, newValue) => {
    console.log(newValue, "newValue");
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 500,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
      >
        {categorys.map((category) => {
          return (
            <Tab
              label={category.categoryName}
              value={category.categoryId}
              {...a11yProps(category.categoryId)}
            />
          );
        })}
      </Tabs>
      {categorys.map((category) => {
        return (
          <TabPanel value={value} index={category.categoryId}>
            {category.subList.map((list) => {
              return <li key={list.categoryId}>{list.categoryName}</li>;
            })}
          </TabPanel>
        );
      })}
    </Box>
  );
};
export default CategoryPro;
