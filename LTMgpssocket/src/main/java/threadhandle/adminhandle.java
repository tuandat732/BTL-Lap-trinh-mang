package threadhandle;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

import common.database;

public class adminhandle implements Runnable {
    private Socket clientSocket;
    private String mapping;

    public adminhandle(Socket socket, String mapping) {

        this.clientSocket = socket;
        this.mapping = mapping;
    }

    public void run() {
        try {
           PrintWriter out = new PrintWriter(
                    clientSocket.getOutputStream(), true);
            out.println(mapping);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

        }
    }
}