import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { fetchSingleService } from "../store/slices/selfSlice";
import Detail from "../components/detail/Detail";
import Loading from "../components/loading/Loading";

const Self = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { single } = useAppSelector((state) => state.self);

  useEffect(() => {
    if (id) dispatch(fetchSingleService(id));
  }, [dispatch, id]);
  if (single === null) return <Loading />;

  return <Detail data={single} images={single.SelfWashImages} />;
};

export default Self;
