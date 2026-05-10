#include <iostream>
#include <fstream>
#include <cstdlib>
#include <string>
#include <vector>

using namespace std;

/* ===== TASK CLASS (OOP) ===== */
class Task {
public:
    string title;
    string priority;
    string status;
    string dueDate;

    Task(string t, string p, string s, string d) {
        title = t;
        priority = p;
        status = s;
        dueDate = d;
    }
};

/* ===== UTILITY FUNCTIONS ===== */
string getValue(string data, string key) {
    int pos = data.find(key + "=");
    if (pos == string::npos) return "";
    pos += key.length() + 1;
    int end = data.find("&", pos);
    return data.substr(pos, end - pos);
}

int priorityValue(string p) {
    if (p == "High") return 1;
    if (p == "Medium") return 2;
    return 3;
}

/* ===== FILE HANDLING ===== */
vector<Task> loadTasks() {
    vector<Task> tasks;
    ifstream file("tasks.txt");
    string t, p, s, d;

    while (file >> t >> p >> s >> d) {
        tasks.push_back(Task(t, p, s, d));
    }
    file.close();
    return tasks;
}

void saveTasks(vector<Task>& tasks) {
    ofstream file("tasks.txt");
    for (int i = 0; i < tasks.size(); i++) {
        file << tasks[i].title << " "
             << tasks[i].priority << " "
             << tasks[i].status << " "
             << tasks[i].dueDate << endl;
    }
    file.close();
}

/* ===== MAIN CGI ===== */
int main() {
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string action = getValue(query, "action");

    vector<Task> tasks = loadTasks();

    /* ===== EXPORT ===== */
    if (action == "export") {
        cout << "Content-Type: text/plain\n";
        cout << "Content-Disposition: attachment; filename=\"tasks_export.txt\"\n\n";

        for (int i = 0; i < tasks.size(); i++) {
            cout << tasks[i].title << " | "
                 << tasks[i].priority << " | "
                 << tasks[i].status << " | "
                 << tasks[i].dueDate << endl;
        }
        return 0;
    }

    cout << "Content-Type: text/html\n\n";

    /* ===== ADD TASK ===== */
    if (action == "add") {
        string task = getValue(query, "task");
        string priority = getValue(query, "priority");
        string duedate = getValue(query, "duedate");

        tasks.push_back(Task(task, priority, "Pending", duedate));
        saveTasks(tasks);

        cout << "<h3>Task Added Successfully</h3>";
        cout << "<a href='/index.html'>Go Back</a>";
    }

    /* ===== COMPLETE TASK ===== */
    else if (action == "complete") {
        int id = atoi(getValue(query, "id").c_str());
        if (id >= 0 && id < tasks.size()) {
            tasks[id].status = "Completed";
            saveTasks(tasks);
        }
        cout << "<h3>Task Marked Completed</h3>";
        cout << "<a href='/cgi-bin/todo.cgi?action=view'>Back</a>";
    }

    /* ===== DELETE TASK ===== */
    else if (action == "delete") {
        int id = atoi(getValue(query, "id").c_str());
        if (id >= 0 && id < tasks.size()) {
            tasks.erase(tasks.begin() + id);
            saveTasks(tasks);
        }
        cout << "<h3>Task Deleted</h3>";
        cout << "<a href='/cgi-bin/todo.cgi?action=view'>Back</a>";
    }

    /* ===== VIEW TASKS ===== */
    else if (action == "view") {

        /* SORT BY PRIORITY */
        for (int i = 0; i < tasks.size(); i++) {
            for (int j = i + 1; j < tasks.size(); j++) {
                if (priorityValue(tasks[i].priority) > priorityValue(tasks[j].priority)) {
                    Task temp = tasks[i];
                    tasks[i] = tasks[j];
                    tasks[j] = temp;
                }
            }
        }

        /* TASK COUNTER */
        int completed = 0;
        for (int i = 0; i < tasks.size(); i++)
            if (tasks[i].status == "Completed") completed++;

        cout << "<h2 style='text-align:center;'>Task List</h2>";
        cout << "<p style='text-align:center; font-weight:bold;'>";
        cout << "Total: " << tasks.size()
             << " | Completed: " << completed
             << " | Pending: " << tasks.size() - completed;
        cout << "</p>";

        cout << "<table>";
        cout << "<tr><th>No</th><th>Task</th><th>Priority</th><th>Status</th><th>Due Date</th><th>Actions</th></tr>";

        for (int i = 0; i < tasks.size(); i++) {

            if (tasks[i].status == "Completed")
                cout << "<tr class='completed'>";
            else
                cout << "<tr>";

            cout << "<td>" << i + 1 << "</td>";
            cout << "<td>" << tasks[i].title << "</td>";
            cout << "<td>" << tasks[i].priority << "</td>";
            cout << "<td>" << tasks[i].status << "</td>";
            cout << "<td>" << tasks[i].dueDate << "</td>";
            cout << "<td>";

            if (tasks[i].status != "Completed")
                cout << "<a href='/cgi-bin/todo.cgi?action=complete&id=" << i << "'>Complete</a> | ";
            else
                cout << "<span style='color:green;'>Completed</span> | ";

            cout << "<a href='/cgi-bin/todo.cgi?action=delete&id=" << i
                 << "' onclick=\"return confirm('Are you sure you want to delete this task?');\">Delete</a>";

            cout << "</td></tr>";
        }

        cout << "</table>";
        cout << "<br><a href='/index.html'>Go Back</a>";
    }

    /* ===== INVALID ===== */
    else {
        cout << "<h3>Invalid Request</h3>";
        cout << "<a href='/index.html'>Go Back</a>";
    }

    return 0;
}
