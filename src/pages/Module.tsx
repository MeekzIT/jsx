import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { fetchSingleService } from "../store/slices/moduleSlice";
import DetailModule from "../components/detail/DetailModule";
import Loading from "../components/loading/Loading";

const Module = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { single } = useAppSelector((state) => state.module);

  useEffect(() => {
    if (id) dispatch(fetchSingleService(id));
  }, [dispatch, id]);
  if (single === null) return <Loading />;
  return <DetailModule data={single} />;
};

export default Module;
