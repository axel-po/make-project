import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";

const TableDashboard = () => {
  return (
    <Table>
      <TableCaption>Les membres intéressés par vos projets :</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Nom de user</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Nom du projet</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Denied</TableCell>
          <TableCell>Clone de Netflix</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="outline">Contacter</Button>
              <Button variant="green">Accepter</Button>
              <Button variant="destructive">Refuser</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableDashboard;
