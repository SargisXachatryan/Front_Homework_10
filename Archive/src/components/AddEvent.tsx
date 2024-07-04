import { Box, Button, Modal, TextField, Select, MenuItem, FormHelperText } from "@mui/material"
import axios from "axios"
import { useContext, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { EventContext } from "../lib/Context"
import { ActionTypes } from "../lib/types"

interface Inputs {
    title: string
    date: string
    time: string
    cover: string
    composer: string
    type: string
}

export const AddEvent = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } ,reset } = useForm<Inputs>()
    const context = useContext(EventContext)

    if (!context)
        throw new Error("Out of Provider...")

    const { dispatch } = context

    const handleAdd: SubmitHandler<Inputs> = data => {
        axios
            .post('http://localhost:3004/events', data)
            .then(res => {
                dispatch({ type: ActionTypes.addEvent, payload: res.data })
                setOpen(false)
                reset()
            })
            .catch(error => {
                console.error('Error adding event:', error)
            })
    }

    return (
        <>
            <Box my={2}>
                <Button onClick={() => setOpen(true)} variant="contained">Add</Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <form onSubmit={handleSubmit(handleAdd)}>
                            <Box my={2}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    {...register("title", {
                                        required: true,
                                        pattern: {
                                            value: /^\S*$/,
                                            message: "Title cannot contain spaces"
                                        }
                                    })}
                                    defaultValue=""
                                    error={!!errors.title}
                                    helperText={errors.title ? errors.title.message : ""}
                                />
                            </Box>

                            <Box my={2}>
                                <TextField
                                    label="Date"
                                    variant="outlined"
                                    {...register("date", {
                                        required: "Date is required",
                                        pattern: {
                                            value: /^(January|February|March|April|May|June|July|August|September|October|November|December) [1-9]|[12][0-9]|3[01]$/,
                                            message: "Enter a valid date (e.g., July 4)"
                                        }
                                    })}
                                    defaultValue=""
                                    error={!!errors.date}
                                    helperText={errors.date ? errors.date.message : ""}
                                />
                            </Box>

                            <Box my={2}>
                                <TextField
                                    label="Time"
                                    variant="outlined"
                                    {...register("time", {
                                        required: "Time is required",
                                        pattern: {
                                            value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                                            message: "Enter a valid time (e.g., 19:00)"
                                        }
                                    })}
                                    defaultValue=""
                                    error={!!errors.time}
                                    helperText={errors.time ? errors.time.message : ""}
                                />
                            </Box>

                            <Box my={2}>
                                <TextField
                                    label="Composer"
                                    variant="outlined"
                                    {...register("composer", {
                                        required: true,
                                        pattern: {
                                            value: /^\S*$/,
                                            message: "Composer cannot contain spaces"
                                        }
                                    })}
                                    defaultValue=""
                                    error={!!errors.composer}
                                    helperText={errors.composer ? errors.composer.message : ""}
                                />
                            </Box>

                            <Box my={2}>
                                <TextField
                                    label="Cover"
                                    variant="outlined"
                                    {...register("cover", {
                                        required: true,
                                        pattern: {
                                            value: /^\S*$/,
                                            message: "Cover cannot contain spaces"
                                        }
                                    })}
                                    defaultValue=""
                                    error={!!errors.cover}
                                    helperText={errors.cover ? errors.cover.message : ""}
                                />
                            </Box>
                            <Box my={2}>
                                <Select
                                    sx={{ width: 200 }}
                                    {...register("type", { required: "Type is required" })}
                                    defaultValue=""
                                    error={!!errors.type}
                                >
                                    <MenuItem value="opera">opera</MenuItem>
                                    <MenuItem value="ballet">ballet</MenuItem>
                                </Select>
                                {errors.type && (
                                    <FormHelperText error>{errors.type.message}</FormHelperText>
                                )}
                            </Box>

                            <Button variant="contained" type="submit">Submit</Button>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}
