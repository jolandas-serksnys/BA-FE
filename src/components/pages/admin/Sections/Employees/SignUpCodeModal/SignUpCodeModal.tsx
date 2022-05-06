import { Button } from "@src/components/common";
import { ConfirmModal } from "@src/components/common/ConfirmModal";
import { model, signUpCodesQueryKey, useGetSignUpCodes } from "@src/hooks/signUpCode";
import { EmployeeRole } from "@src/models/employee";
import { SignUpCode } from "@src/models/signUpCode";
import { capitalize, queryClient } from "@src/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
}

export const SignUpCodeModal = ({ onClose }: Props) => {
  const [code, setCode] = useState("");
  const [role, setRole] = useState(EmployeeRole.GENERAL);

  const { data } = useGetSignUpCodes();

  const deleteSignUpCode = async (id: number) => {
    await model().delete(id);
    queryClient.invalidateQueries(signUpCodesQueryKey);
  };

  return (
    <ConfirmModal
      title="Sign Up code"
      subTitle="Manage sign up codes"
      onConfirm={async () => {
        try {
          const response = await model().create({ role });
          queryClient.invalidateQueries(signUpCodesQueryKey);
          setCode(response.code);
        } catch (error) {
          toast.error('Something went wrong trying to perform this action.');
          console.log(error);
        }
      }}
      onClose={onClose}
      isLoading={false}
    >
      <div className="d-flex flex-column gap-3">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Role</th>
              <th>Created at</th>
              <th className="text-end pe-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item: SignUpCode) => (
              <tr key={item.id}>
                <td>
                  <div className="d-inline-flex bg-gray p-2 px-3 rounded">
                    <code>{item.code}</code>
                  </div>
                </td>
                <td>
                  {capitalize(item.role)}
                </td>
                <td>
                  {item.createdAt.split('T')[0]}
                </td>
                <td className="text-end">
                  <Button
                    size="sm"
                    variant="danger"
                    outline
                    className="p-1 px-2 border-0"
                    onClick={() => deleteSignUpCode(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <strong>Generate a new code</strong>
        <p className="m-0">To generate a new sign up code, select a role for the employee and click the confirmation button below. Your new code will be visible below.</p>
        <div>
          <select
            className="form-control"
            onChange={(e) => setRole(e.target.value as EmployeeRole)}
          >
            {Object.keys(EmployeeRole).map(key => (
              <option key={key} value={key}>{capitalize(key)}</option>
            ))}
          </select>
        </div>
        {code &&
          <code className="bg-gray p-3 rounded w-100 d-block text-center">
            <h1 className="m-0">{code}</h1>
          </code>
        }
      </div>
    </ConfirmModal>
  );
};