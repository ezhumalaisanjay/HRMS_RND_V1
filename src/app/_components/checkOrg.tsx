"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react"; // Make sure you're importing from "react"

export default function CheckOrg() {
  const [mutateError, setMutateError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState("ORG#1");
  const listOrg = api.check.list.useQuery();

  const getOrg = api.check.get.useQuery(
    {
      sk: sortKey,
    },
    // {
    //   // enabled(query) {
    //   //   console.log(query.queryKey);
    //   //   return !!sortKey;
    //   // },
    // },
  );

  const deleteOrg = api.check.delete.useMutation({
    onError: (error) => {
      console.log(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
      void listOrg.refetch();
      void getOrg.refetch();
    },
  });
  // Define the mutation
  const mutation = api.check.create.useMutation({
    onError: (error: { message: React.SetStateAction<string | null> }) => {
      setMutateError(error.message);
    },
    onSuccess: () => {
      void listOrg.refetch();
      void getOrg.refetch();
    },
  });

  const updateMutation = api.check.update.useMutation({
    onError: (error: { message: React.SetStateAction<string | null> }) => {
      setMutateError(error.message);
    },
    onSuccess: () => {
      void listOrg.refetch();
      void getOrg.refetch();
    },
  });

  // Handle the button click
  const handleClick = () => {
    mutation.mutate({
      description: "Hello",
      name: "SOS",
      licenseStartsAt: "2024-10-10",
      licenseDuration: 3,
      registeredMail: "ms@hello.com",
    });
  };

  const handleUpdate = () => {
    updateMutation.mutate({
      description: "Hello Updated",
      name: "SOS",
      licenseStartsAt: "2024-10-10",
      licenseDuration: 3,
      registeredMail: "ms@hello.com",
      sk: "ORG#1",
    });
  };

  const handleDelete = () => {
    deleteOrg.mutate({ sk: sortKey });
  };

  return (
    <div>
      <button onClick={handleClick}>Create</button>
      {mutateError && <p>Error: {mutateError}</p>}
      <br />
      {listOrg.isPending && "Pending"}
      {listOrg.error && JSON.stringify(listOrg.error.message)}
      <br />
      {listOrg.data && "list: " + JSON.stringify(listOrg.data)}
      <br />
      {getOrg.isPending && "Pending"}
      {getOrg.error && "Get: " + JSON.stringify(getOrg.error.message)}
      <br />
      {getOrg.data && "Get: " + JSON.stringify(getOrg.data)}
      <br />
      <button onClick={handleDelete}>Delete</button>
      {/* {mutateError && <p>Error: {mutateError}</p>} */}
      <br />
      <br />
      <button onClick={handleUpdate}>Update</button>
      {mutateError && <p>Error: {mutateError}</p>}
      <br />
    </div>
  );
}
