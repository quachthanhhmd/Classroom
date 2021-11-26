import { Button, Card, CardContent, Grid, ListItemText, TextField, Typography, ListItem } from '@material-ui/core';
import { Add, Delete, Edit, Save } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from 'react-redux';
import { IExerciseTypeDetail } from '../../interfaces';
import { AppState } from '../../reducers';
import "./index.scss";



interface IDrageAttribute {
    id: number;
    dragId: string;
    content: string;
    description?: string;
    grade: number;
}

const serializeDataType = (item: IExerciseTypeDetail, count: number) => {
    return {
        id: item.id,
        dragId: `item-${count}`,
        content: `item ${item.name}`,
        grade: item.grade,
        description: item?.description
    }
}

const fakeData = (count: number): IDrageAttribute => {
    return {
        id: count,
        dragId: `item-${count}`,
        content: "",
        grade: 0,
        description: ""
    }
}

// fake data generator
const serializeExerciseType = (data: IExerciseTypeDetail[]): IDrageAttribute[] => {
    return Array.from({ length: data.length }, (v, k) => k).map(k => (serializeDataType(data[k], k)));
}
// a little function to help us with reordering the result
const reorder = (list: IDrageAttribute[], startIndex: number, endIndex: number): IDrageAttribute[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getDisableList = (count: number): boolean[] => {
    return new Array(count).fill(true);
}


const GradeStructure = () => {
    const [itemList, setItemList] = useState<IDrageAttribute[]>([]);
    const [isDisableList, setIsDisableList] = useState<boolean[]>([]);
    const [chooseIndex, setChooseIndex] = useState<number>(0);

    const course = useSelector((state: AppState) => state!.course);


    useEffect(() => {
        if (course.course?.exerciseTypeList) {
            setItemList(serializeExerciseType(course.course?.exerciseTypeList));
            setIsDisableList(getDisableList(itemList.length));
        }
    }, [course.course?.exerciseTypeList])

    useEffect(() => {
        if (itemList.length === 0) {
            setChooseIndex(-1);
        }
        else {
            setChooseIndex(chooseIndex);
        }
    }, [itemList, chooseIndex])

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        if (typeof itemList === 'undefined') return;

        const items = reorder(
            itemList,
            result.source.index,
            result.destination.index
        );

        setItemList(items);
    }

    const handleChangeEvent = () => {
        let newDisableList = [...isDisableList];
        newDisableList[chooseIndex] = !newDisableList[chooseIndex];
        setIsDisableList(newDisableList);
    }

    const handleAddDrag = () => {
        let newItemList = [...itemList];
        newItemList.push(fakeData(newItemList.length));
        setItemList(newItemList);

        let newDisableList = [...isDisableList];
        newDisableList.push(true);
        setIsDisableList(newDisableList);

        setChooseIndex(itemList.length);
    }

    return (
        <div className="structure-main">
            <Card className="structure-main___title">
                <Typography variant="h4" component="div" className="structure-main___title--class-name">
                    Lap tring ung dung web - 18 - 3
                </Typography>
                <CardContent>

                    <Grid container spacing={2} className="structure-main___content--structure">
                        <Grid xs={6}>
                            <p className="structure-main___content--structure--header">Loại điểm</p>
                        </Grid>
                        <Grid xs={6} >
                            <p className="structure-main___content--structure--header">Thang điểm</p></Grid>

                        {itemList.map((item) => (
                            <>
                                {
                                    item.content &&
                                    <>
                                        <Grid xs={6}>{item.content}</Grid>
                                        <Grid xs={6}>{item.grade}</Grid>
                                    </>
                                }
                            </>
                        ))}

                    </Grid>
                    <div className="structure-main___content--structure--total" >
                        Tổng cộng: {itemList.reduce((a, b) => a + b.grade, 0)} điểm
                    </div>
                </CardContent>
            </Card>

            <Card className="structure-main___drag">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {chooseIndex !== -1 &&
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="structure-main___drag___list-show"

                                        >
                                            {itemList.map((item, index) => (
                                                <Button
                                                    fullWidth
                                                    style={{ padding: '0px' }}
                                                    onClick={() => {
                                                        console.log(item.dragId.split('-')[1])
                                                        setChooseIndex(Number(item.dragId.split('-')[1]));
                                                    }}
                                                >
                                                    <Draggable

                                                        key={item.dragId} draggableId={item.dragId} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`structure-main___drag___list-show--item${`item-${chooseIndex}` === item.dragId ? " structure-main___drag___list-show--item--click" : ""}`}

                                                            >
                                                                {item.content ? item.content : "Thang điểm mới"}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </Button>
                                            ))}
                                            {provided.placeholder}
                                        </div>

                                    )}

                                </Droppable>
                            }
                            <Button className="structure-main___drag--add-more"
                                style={{ backgroundColor: "rgb(151, 151, 151)" }}
                                onClick={handleAddDrag}>
                                <Add />
                            </Button>
                        </DragDropContext>
                    </Grid>
                    <Grid item xs={8}>
                        {chooseIndex !== -1 && itemList.length !== 0 ?
                            <Card className="structure-main___drag___description">

                                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                                    Thông tin về loại cấu trúc điểm
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Tên loại điểm"
                                    defaultValue={itemList[chooseIndex].content}
                                    disabled={isDisableList[chooseIndex]}
                                    variant={`${!isDisableList[chooseIndex] ? "standard" : "filled"}`}
                                />
                                <TextField
                                    fullWidth
                                    label="Số điểm"
                                    defaultValue={itemList[chooseIndex].grade}
                                    disabled={isDisableList[chooseIndex]}
                                    variant={`${!isDisableList[chooseIndex] ? "standard" : "filled"}`}
                                />
                                <TextField
                                    fullWidth
                                    label="Mô tả về loại điểm này"
                                    defaultValue={itemList[chooseIndex].description}
                                    disabled={isDisableList[chooseIndex]}
                                    variant={`${!isDisableList[chooseIndex] ? "standard" : "filled"}`}
                                />
                                <div className="structure-main___drag___description--update">
                                    <Button variant="outlined" startIcon={<Delete />} style={{ color: "white", backgroundColor: "rgb(248, 44, 44)" }}>
                                        Xóa
                                    </Button>
                                    {
                                        isDisableList[chooseIndex] ?
                                            <Button
                                                onClick={handleChangeEvent}
                                                variant="outlined" startIcon={<Edit />} style={{ color: "white", backgroundColor: "green" }}>
                                                Chỉnh sửa
                                            </Button>
                                            :
                                            <Button
                                                onClick={handleChangeEvent}
                                                variant="outlined" startIcon={<Save />} style={{ color: "white", backgroundColor: "blue" }}>
                                                Lưu
                                            </Button>
                                    }
                                </div>
                            </Card >
                            : <Card className="structure-main___drag___description">
                                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                                    Bạn chưa có loại điểm nào
                                </Typography>
                            </Card>
                        }
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default GradeStructure;