import http from "http";
import Socket from "socket.io";

export const socketServer = (httpServer: http.Server) => {
    const io: Socket.Server = new Socket.Server(httpServer, {
        cors: {
            origin: "*",
        }
    });
    const socketsConnected = new Set<{ skId: string, userId: number }>();

    const onConnected = (sk: Socket.Socket) => {

        console.log("connection....", sk.id);
        socketsConnected.add({ skId: sk.id, userId: -1 });
        console.log(socketsConnected);
        // update userId
        sk.on("update-user-id", (userId) => {
            console.log("Update user id: ", sk.id);
            socketsConnected.forEach((conn) => {
                if (conn.skId === sk.id) {
                    socketsConnected.delete(conn);
                }
            });
            socketsConnected.add({ skId: sk.id, userId });
            console.log(socketsConnected);
        });

        sk.on("disconnect", () => {
            console.log("Socket disconnected...", sk.id);
            socketsConnected.forEach((conn: any) => {
                if (conn.skId === sk.id) {
                    socketsConnected.delete(conn);
                }
            });
        })

        sk.on("notify-exercise-final", ({data, studentList}) => {
            console.log("Update notify: ", data);
            console.log(studentList);
            const socketIdList: string[] = [];
            socketsConnected.forEach((conn: any) => {

                let skIdReceiver: any = null;
                studentList.forEach((item) => {
                    if (item === conn.userId) {
                        skIdReceiver = conn.skId;
                    }
                })
                if (skIdReceiver !== null) {
                    socketIdList.push(skIdReceiver);
                }
            })
            console.log(socketIdList);
            io.sockets.to(socketIdList).emit("notify-send-one-user", data);
        });

        sk.on("notify-one-exercise", ({ data, userId }) => {
            console.log("Update notify: ", data);

            let socketReceiver: string = "";

            socketsConnected.forEach((item) => {
                if (userId === item.userId && item.userId !== -1) {
                    socketReceiver = item.skId;
                }
            })
            io.sockets.to(socketReceiver).emit("notify-send-one-user", data);
        })
    }

    io.on("connection", onConnected);
}
