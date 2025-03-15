-- إنشاء وظيفة SQL لإنشاء جدول سجل سير العمل
CREATE OR REPLACE FUNCTION create_workflow_history_table_function()
RETURNS void AS $$
BEGIN
  -- التحقق من وجود الجدول
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'workflow_history') THEN
    -- إنشاء الجدول إذا لم يكن موجودًا
    CREATE TABLE public.workflow_history (
      id SERIAL PRIMARY KEY,
      instance_id TEXT NOT NULL UNIQUE,
      workflow_id TEXT NOT NULL,
      workflow_name TEXT NOT NULL,
      reference TEXT,
      current_step_id TEXT,
      current_step TEXT,
      status TEXT,
      started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      completed_at TIMESTAMP WITH TIME ZONE,
      duration TEXT,
      initiated_by TEXT,
      assigned_to TEXT,
      data JSONB
    );
    
    -- إنشاء مؤشر على instance_id
    CREATE INDEX idx_workflow_history_instance_id ON public.workflow_history(instance_id);
    
    -- إنشاء مؤشر على workflow_id
    CREATE INDEX idx_workflow_history_workflow_id ON public.workflow_history(workflow_id);
    
    -- إضافة تعليق على الجدول
    COMMENT ON TABLE public.workflow_history IS 'جدول سجل سير العمل';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- إنشاء وظيفة SQL لإنشاء جدول سجل سير العمل (الوظيفة التي يتم استدعاؤها من التطبيق)
CREATE OR REPLACE FUNCTION create_workflow_history_table()
RETURNS void AS $$
BEGIN
  -- استدعاء وظيفة إنشاء الجدول
  PERFORM create_workflow_history_table_function();
END;
$$ LANGUAGE plpgsql;
