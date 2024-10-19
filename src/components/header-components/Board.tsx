import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData } from "../../store/slices/boardSlice";
import { Board } from "../../store/types";
import CardSmall from "../cards/CardSmall";
import Loading from "../loading/Loading";

const BoardHeader = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.board);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-box">
      {data.map((i: Board) => (
        <CardSmall key={i.id} data={i} image={i.BoardImages[0]} href="/board/" />
      ))}
    </div>
  );
};

export default BoardHeader;
