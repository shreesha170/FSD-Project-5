document.addEventListener('DOMContentLoaded', () => {
    const doctors = [
        { id: 1, name: 'Dr. Nirmal', field: 'Cardiology', totalSlots: 2, bookedSlots: [] },
        { id: 2, name: 'Dr. Jackie', field: 'Dermatology', totalSlots: 8, bookedSlots: [] },
        { id: 3, name: 'Dr. Balu', field: 'Neurology', totalSlots: 12, bookedSlots: [] },
        { id: 4, name: 'Dr. Tabu', field: 'Pediatrics', totalSlots: 9, bookedSlots: [] },
        { id: 5, name: 'Dr. Abishek', field: 'Orthopedics', totalSlots: 7, bookedSlots: [] },
        { id: 6, name: 'Dr. Vishali', field: 'Gastroenterology', totalSlots: 11, bookedSlots: [] },
        { id: 7, name: 'Dr. Victor', field: 'Oncology', totalSlots: 10, bookedSlots: [] }
    ];
    
        const appointments = [];
    
        const doctorSelection = document.getElementById('doctor-selection');
        const doctorsTableBody = document.querySelector('#doctors-table tbody');
        const appointmentsList = document.getElementById('appointments-list');
    
        function populateDoctors() {
            doctorSelection.innerHTML = ''; // Clear existing options
            doctorsTableBody.innerHTML = '';
    
            doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = `${doctor.name} (${doctor.field})`;
                doctorSelection.appendChild(option);
    
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${doctor.id}</td>
                    <td>${doctor.name}</td>
                    <td>${doctor.field}</td>
                    <td>${doctor.totalSlots}</td>
                    <td>${doctor.totalSlots - doctor.bookedSlots.length}</td>
                    <td>${doctor.bookedSlots.length}</td>
                `;
                doctorsTableBody.appendChild(tr);
            });
        }
    
        function formatTime(time) {
            const [hour, minute] = time.split(':');
            const period = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            return `${formattedHour}:${minute} ${period}`;
        }
    
        function bookAppointment(event) {
            event.preventDefault();
    
            const patientName = document.getElementById('patient-name').value;
            const doctorId = parseInt(doctorSelection.value);
            const appointmentDate = document.getElementById('appointment-date').value;
            const appointmentTime = document.getElementById('appointment-time').value;
    
            if (!patientName || !doctorId || !appointmentDate || !appointmentTime) {
                alert('Please fill out all fields');
                return;
            }
    
            const doctor = doctors.find(d => d.id === doctorId);
            const isTimeSlotBooked = doctor.bookedSlots.some(slot => slot.date === appointmentDate && slot.time === appointmentTime);
    
            if (doctor.bookedSlots.length >= doctor.totalSlots) {
                alert('All slots are booked. Please try another time or contact the hospital for more details.');
                return;
            }
    
            if (isTimeSlotBooked) {
                alert('This time slot is already booked. Please select another time slot.');
                return;
            }
    
            const appointmentId = `APPT-${Date.now()}`;
            const appointment = { id: appointmentId, patientName, doctorName: doctor.name, date: appointmentDate, time: formatTime(appointmentTime) };
    
            doctor.bookedSlots.push({ id: appointmentId, date: appointmentDate, time: appointmentTime });
            appointments.push(appointment);
            alert('Appointment booked successfully');
            document.getElementById('booking-form').reset();
            displayAppointments();
            populateDoctors();
        }
    
        function cancelAppointment() {
            const appointmentId = document.getElementById('appointment-id').value;
            const index = appointments.findIndex(appt => appt.id === appointmentId);
    
            if (index === -1) {
                alert('Invalid Appointment ID');
                return;
            }
    
            const appointment = appointments[index];
            const doctor = doctors.find(d => d.name === appointment.doctorName);
    
            const bookedSlotIndex = doctor.bookedSlots.findIndex(slot => slot.id === appointmentId);
    
            if (bookedSlotIndex !== -1) {
                doctor.bookedSlots.splice(bookedSlotIndex, 1);
            }
    
            appointments.splice(index, 1);
    
            alert('Appointment canceled successfully');
            displayAppointments();
            populateDoctors();
        }
    
        function displayAppointments() {
            appointmentsList.innerHTML = '';
    
            if (appointments.length === 0) {
                appointmentsList.textContent = 'No appointments';
                return;
            }
    
            const ul = document.createElement('ul');
            appointments.forEach(appt => {
                const li = document.createElement('li');
                li.textContent = `ID: ${appt.id}, Patient: ${appt.patientName}, Doctor: ${appt.doctorName}, Date: ${appt.date}, Time: ${appt.time}`;
                ul.appendChild(li);
            });
    
            appointmentsList.appendChild(ul);
        }
    
        document.getElementById('booking-form').addEventListener('submit', bookAppointment);
        document.getElementById('cancel-appointment').addEventListener('click', cancelAppointment);
        document.getElementById('view-appointments').addEventListener('click', displayAppointments);
    
        populateDoctors();
    });
    