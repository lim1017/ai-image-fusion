import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../lib/api";
import { SinglePost, postData } from "../lib/types";
import { useState } from "react";
import { Message } from "./useWebSocketChat";

export const useSharePost = ({ user }: { user: string }) => {
  const queryClient = useQueryClient();
  const [sharedImagesArr, setSharedImagesArr] = useState<number[]>([]);

  const { mutate, isLoading: submitPostLoading } = useMutation<
    SinglePost,
    unknown,
    postData
  >((newData: postData) => createPost(newData), {
    onSuccess: () => {
      //@ts-expect-error passing in an array does not work
      queryClient.invalidateQueries("posts");
    },
    onError(error) {
      console.log(error);
      alert(error);
    },
  });

  const handleShare = async (message: Message) => {
    try {
      mutate({
        name: user,
        prompt: message.text,
        photo: `data:image/jpeg;base64,${message.image}`,
        email: "",
      });
      setSharedImagesArr((prev) => [...prev, message.id]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleShare,
    submitPostLoading,
    sharedImagesArr,
  };
};
