import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { fetchSingleService } from "../store/slices/boardSlice";
import Detail from "../components/detail/Detail";
import Loading from "../components/loading/Loading";

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { single } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (id) dispatch(fetchSingleService(id));
  }, [dispatch, id]);
  if (single === null) return <Loading />;

  return <Detail data={single} images={single.BoardImages} />;
};

export default Board;
