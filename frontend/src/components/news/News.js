import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";
import { ButtonDelete, ButtonEdit, ButtonCreate } from "../button/Button";
import axios from "axios";
import { baseUrl } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    method: "GET",
    url: `${baseUrl}/news`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const fetchNews = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.news);
        setNews(response.data.news);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    closeSnackbar();
    const deleteOptions = {
      method: "DELETE",
      url: `${baseUrl}/news/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchNews();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <ButtonCreate link="/news/create" title=" + Create news" />
      <Table variant="simple" size="md" bg="#fff">
        <Thead>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Content</Th>
          <Th>Writter</Th>
          <Th>picture</Th>
          <Th>Action</Th>
        </Thead>
        <Tbody>
          {loading ? (
            <>loading</>
          ) : (
            news?.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.title}</Td>
                <Td>{item.contents}</Td>
                <Td>{item.writter}</Td>
                <Td>
                  <a href={item.picture} target="_blank" rel="noreferrer">
                    <img
                      src={item.picture}
                      alt="news"
                      width="50px"
                      height="30px"
                    />
                  </a>
                </Td>
                <Td>
                  <Flex>
                    <ButtonEdit link={`/news/${item._id}/edit`} title="Edit" />
                    <ButtonDelete
                      onClick={() => {
                        if (window.confirm("Yakin ingin menghapus ?"))
                          handleDelete(item._id);
                      }}
                      title="Delete"
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default News;
