import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import Detail from "../components/detail/Detail";
import Loading from "../components/loading/Loading";
import { fetchSingleService } from "../store/slices/spareSlice";

const Spare = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { single } = useAppSelector((state) => state.spare);

  useEffect(() => {
    if (id) dispatch(fetchSingleService(id));
  }, [dispatch, id]);
  if (single === null) return <Loading />;

  return <Detail data={single} images={single.SpareImages} />;
};

export default Spare;
