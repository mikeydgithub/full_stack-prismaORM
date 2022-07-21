import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { trpc } from "@/utils/trpc";

import {
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List,
  ListItem,
} from "../components/index";
import { GroceryList } from '@prisma/client';

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>("");

  // find all mutations
  const { data: list, refetch } = trpc.useQuery(["findAll"]);
  
  // insert one
  const insertMutation = trpc.useMutation(["insertOne"], {
    onSuccess: () => refetch(),
  });

  // delete all mutations
  const deleteAllMutation = trpc.useMutation(["deleteAll"], {
    onSuccess: () => refetch(),
  });

  // update one mutation
  const updateOneMutation = trpc.useMutation(["updateOne"], {
    onSuccess: () => refetch(),
  })

  // insert one item
  const insertOne = useCallback(() => {
    if (itemName === "") return;

    insertMutation.mutate({
      title: itemName,
    });

    setItemName("");
  }, [itemName, insertMutation]);

  // clear all items
  const clearAll = useCallBack(() => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: list.map((item) => item.id),
      });
    }
  }, [list, deleteAllMutation]);

  // update one item
  const updateOne = useCallback(
    (item: GroceryList) => {
      updateOneMutation.mutate({
        ...item,
        checked: !item.checked,
      });
    },
    [updateOneMutation]
  );

  // return tsx
  return (
    <>
    <Head>
      <title>Grocery List</title>
      <meta name="description" content="Visit www.mosano.eu" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    </>
  )
}