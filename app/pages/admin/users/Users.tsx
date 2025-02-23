import React, { useEffect, useState, type JSX } from "react"
import { Loader } from '~/components/ui/loader'
import { HeaderPage } from '~/components/admin/header-page'
import { TableUsers } from "~/components/admin/table-users"
import { useUser } from "~/hooks/use-user"
import { ModalBasic } from "~/components/common/modal-basic"
import { AddEditUserForm } from "~/components/admin/add-edit-user-form"


export function UsersAdminClient() {
  const { loading, users, getUsers, updateUser, deleteUser } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState("")
  const [contentModal, setContentModal] = useState<React.ReactNode | null>(null)

  useEffect(() => {
      getUsers();
  }, [getUsers])
  const openCloseModal = () => setShowModal((prev) => !prev)

  const openAddUserModal = () => {
    setTitleModal("Añadir nuevo usuario")
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefetch={getUsers} />
    )
    openCloseModal()
  }
  const openUpdateUserModal = (user: any) => {
    setTitleModal("Actualizar usuario")
    setContentModal(
      <AddEditUserForm user={user} onClose={openCloseModal} onRefetch={getUsers} />
    )
    openCloseModal()
  }
  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo usuario"
        btnClick={openAddUserModal}
      />
      {loading ? (
        <Loader>Cargando...</Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={openUpdateUserModal}
          onDeleteUser={deleteUser}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
      >
        {contentModal}
      </ModalBasic>
        </>
    )
}


function setShowModal(arg0: (prev: any) => boolean) {
  throw new Error("Function not implemented.")
}
function setTitleModal(arg0: string) {
  throw new Error("Function not implemented.")
}

function setContentModal(arg0: JSX.Element) {
  throw new Error("Function not implemented.")
}

