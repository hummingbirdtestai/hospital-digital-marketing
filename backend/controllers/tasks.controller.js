import { supabase } from '../services/supabaseClient.js';
import { uploadProof as supabaseUpload } from '../utils/fileUpload.js';

// GET today's tasks
export async function getTasksToday(req, res) {
  const { executiveId } = req.params;
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_tasks')
    .select('*')
    .eq('executive_id', executiveId)
    .eq('date', today);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

// GET tasks by date
export async function getTasksByDate(req, res) {
  const { date, executiveId } = req.params;

  const { data, error } = await supabase
    .from('daily_tasks')
    .select('*')
    .eq('executive_id', executiveId)
    .eq('date', date);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

// PATCH update task
export async function updateTask(req, res) {
  const { taskId } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('daily_tasks')
    .update(updates)
    .eq('id', taskId)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
}

// POST upload file
export async function uploadProof(req, res) {
  const { taskId } = req.params;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const path = await supabaseUpload(
      taskId,
      file.buffer,
      file.originalname,
      file.mimetype
    );

    const { error } = await supabase
      .from('daily_tasks')
      .update({ upload_url: path })
      .eq('id', taskId);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Upload successful', path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET executive performance
export async function getPerformanceSummary(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('daily_tasks')
    .select('status, actual_hours')
    .eq('executive_id', id);

  if (error) return res.status(500).json({ error: error.message });

  const total = data.length;
  const completed = data.filter(t => t.status === 'done').length;
  const avgHours =
    data.reduce((sum, t) => sum + (t.actual_hours || 0), 0) / (total || 1);

  res.json({
    total_tasks: total,
    completed_tasks: completed,
    percent_complete: Math.round((completed / (total || 1)) * 100),
    avg_actual_hours: parseFloat(avgHours.toFixed(2))
  });
}
