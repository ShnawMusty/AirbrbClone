import { useRouter } from "next/navigation"
import useLoginModalStore from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useMemo } from "react";


const useFavorite = ({listingId, currentUser}) => {
  
  const router = useRouter();
  const useLoginModal = useLoginModalStore();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds;

    return list?.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite =  useCallback(async(e) => {
    e.stopPropagation();

    if(!currentUser) {
      return useLoginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`api/favorites/${listingId}`);

      } else {
        request = () => axios.post(`api/favorites/${listingId}`)
      }
      
      await request();
      router.refresh();
      toast.success('Success');

      
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [currentUser, hasFavorited, listingId, useLoginModal, router]);

  return { hasFavorited, toggleFavorite };
}


export default useFavorite