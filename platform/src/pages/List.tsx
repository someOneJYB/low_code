import {useEffect, useState} from "react";
import {deleteCanvas, getCanvasList} from "../request/canvas";
import {Card, Space, Table, Button} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {ICmp} from "../store/editStoreTypes";
import docCookies from "src/utils/cookies";

type ListItem = {
  id: number;
  type: string;
  title: string;
  content: string;
};

export default function List() {
  const username = docCookies.getItem("name");

  const navigate = useNavigate();
  const logout = () => {
    docCookies.removeItem("sessionId");
    docCookies.removeItem("name");
    // navigate("/");
    window.location.href = "/";
  };

  const [list, setList] = useState([]);

  const fresh = () => {
    getCanvasList("", (res: any) => {
      let data = res|| [];
      // 不让用户编辑这三个模板页
      // data = data.filter(
      //   (item: ICmp) => item.id !== 2 && item.id !== 30 && item.id !== 31
      // );
      setList(data);
    });
  };

  useEffect(() => {
    fresh();
  }, []);

  const del = (values: {id: number}) => {
    deleteCanvas(values, () => {
      alert("删除成功");
      fresh();
    });
  };

  const editUrl = (item: ListItem) => `/?id=${item.id}&type=${item.type}`;
  const columns = [
    {
      title: "id",
      key: "id",
      render: (item: ListItem) => {
        return <Link to={editUrl(item)}>{item.id}</Link>;
      },
    },
    {
      title: "标题",
      key: "title",
      render: (item: ListItem) => {
        const title = item.title || "未命名";
        return <Link to={editUrl(item)}>{title}</Link>;
      },
    },

    {
      title: "类型",
      key: "type",
      render: (item: ListItem) => {
        const typeDesc = item.type === "content" ? "页面" : "模板页";
        return <div className="red">{typeDesc}</div>;
      },
    },

    {
      title: "动作",
      key: "action",
      render: (item: ListItem) => {
        const {id} = item;
        return (
          <Space size="middle">
            <a
              target="_blank"
              href={"http://localhost:3000/preview/" + id}>
              线上查看（切移动端）
            </a>

            <Link to={editUrl(item)}>编辑</Link>
            <Button onClick={() => del({id})}>删除</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Card>
      <Space size="large">
        <Button onClick={logout}> {username} 退出登录 </Button>
      </Space>

      <Space size="middle">
        <Link to={"/"}>新增</Link>
      </Space>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={(record: ListItem) => record.id}
      />
    </Card>
  );
}
