import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as chatApi from "../api/chat-api";

export function useChat() {
  const queryClient = useQueryClient();

  const getChats = (senderId, receiverId) => {
    return useQuery({
      queryKey: ["chats", senderId, receiverId],
      queryFn: () => chatApi.getChats(senderId, receiverId),
      select: (response) => response.data?.messages,
      enabled: !!senderId && !!receiverId, // Only run query if senderId and receiverId are provided
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const getChatById = (chatId) => {
    return useQuery({
      queryKey: ["chatById", chatId],
      queryFn: () => chatApi.getChatById(chatId),
      enabled: !!chatId, // Only run query if chatId is provided
      select: (response) => response.data,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  };

  const postChat = () => {
    return useMutation({
      mutationFn: chatApi.postChat,
      onSuccess: () => {
        // Invalidate maintenance requests query to refetch
        queryClient.invalidateQueries({ queryKey: ["postChat"] });
      },
    });
  };

  return {
    getChats,
    getChatById,
    postChat,
  };
}
