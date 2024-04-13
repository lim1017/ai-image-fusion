import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SinglePost, postData } from "../Modules/DisplayImages/lib/types";
import { Message } from "../Modules/Chat/types/types";
import { createPost } from "../Modules/CreateImage/lib/api";

/**
 * Creates a custom hook for sharing a post.
 *
 * @param {string} params.user - The username of the user sharing the post.
 * @return {Object} - The hook's return value.
 * @return {Function} return.handleShare - The function for sharing a post.
 * @return {boolean} return.submitPostLoading - Indicates if the post submission is loading.
 * @return {number[]} return.sharedImagesArr - The array of shared image IDs.
 */
export const useSharePost = ({
  user,
  email,
}: {
  user: string;
  email: string;
}) => {
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
        prompt: message.text
          ? message.text
          : message.imagePrompt
          ? message.imagePrompt
          : "",
        photo: `data:image/jpeg;base64,${message.image}`,
        email,
      });
      setSharedImagesArr((prev) => [...prev, message.id]);
    } catch (error) {
      console.log(error, "err in handle share");
    }
  };

  return {
    handleShare,
    submitPostLoading,
    sharedImagesArr,
  };
};
